from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"])

def call_groq(prompt: str) -> str:
    """Call Groq API - Free & Fast"""
    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={"Authorization": f"Bearer {os.getenv('GROQ_API_KEY')}"},
            json={
                "model": "groq/compound",  # Free model
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.7,
                "max_tokens": 2000
            },
            timeout=30
        )
        
        if response.status_code != 200:
            raise Exception(f"Groq API error: {response.status_code} - {response.text}")
        
        return response.json()["choices"][0]["message"]["content"]
    
    except Exception as e:
        print(f"Groq API Error: {e}")
        raise e

class RoadmapRequest(BaseModel):
    topic: str

@app.post("/generate-roadmap")
async def generate_roadmap(request: RoadmapRequest):
    try:
        print(f"🔍 Generating roadmap for: {request.topic}")
        
        prompt = f"""
        Create a comprehensive 1-month learning roadmap for {request.topic} for beginners.
        Return ONLY valid JSON in this format:
        {{
          "title": "Roadmap for {request.topic}",
          "nodes": [
            {{
              "id": "1",
              "title": "Topic name",
              "description": "Detailed description of what to learn",
              "difficulty": "easy",
              "estimatedTime": 4,
              "week": 1
            }}
          ]
        }}
        
        Create 8-12 detailed nodes covering all essential {request.topic} topics.
        Make it practical and progressive.
        Return ONLY the JSON without any other text.
        """

        ai_text = call_groq(prompt)
        print(f"✅ AI Response received, length: {len(ai_text)}")
        
        # Clean response
        ai_text = ai_text.replace("```json", "").replace("```", "").strip()
        
        ai_data = json.loads(ai_text)
        print(f"✅ JSON parsed with {len(ai_data.get('nodes', []))} nodes")
        
        return {
            "success": True,
            "roadmap": ai_data,
            "message": "Roadmap generated successfully with Groq"
        }
        
    except Exception as e:
        print(f"🚨 Error: {e}")
        return {
            "success": True,
            "roadmap": {
                "title": f"Learn {request.topic}",
                "nodes": [
                    {
                        "id": "1",
                        "title": f"Start {request.topic}",
                        "description": "Basic concepts and setup",
                        "difficulty": "easy",
                        "estimatedTime": 4,
                        "week": 1
                    }
                ]
            },
            "message": "Used fallback roadmap"
        }

@app.get("/")
async def root():
    return {"message": "AI Roadmap API is running", "model": "Groq"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}