from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .models import Base, Goal, engine, SessionLocal
from . import models, crud, schemas
from pydantic import BaseModel
from typing import List
import datetime

app = FastAPI()

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class GoalBase(BaseModel):
    goal: str
    how: str
    date: datetime.datetime
    place: str

class GoalCreate(GoalBase):
    pass

class GoalUpdate(GoalBase):
    pass

class GoalResponse(GoalBase):
    id: int

    class Config:
        orm_mode = True

@app.get("/goals/", response_model=List[GoalResponse])
def read_goals(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_goals(db, skip=skip, limit=limit)

@app.post("/goals/", response_model=GoalResponse)
def create_goal(goal: GoalCreate, db: Session = Depends(get_db)):
    db_goal = Goal(**goal.dict())
    return crud.create_goal(db=db, goal=db_goal)

@app.put("/goals/{goal_id}", response_model=GoalResponse)
def update_goal(goal_id: int, goal: GoalUpdate, db: Session = Depends(get_db)):
    updated_goal = crud.update_goal(db=db, goal_id=goal_id, updated_goal=goal.dict())
    if updated_goal is None:
        raise HTTPException(status_code=404, detail="Goal not found")
    return updated_goal

@app.delete("/goals/{goal_id}")
def delete_goal(goal_id: int, db: Session = Depends(get_db)):
    deleted_goal = crud.delete_goal(db=db, goal_id=goal_id)
    if deleted_goal is None:
        raise HTTPException(status_code=404, detail="Goal not found")
    return {"message": "Goal deleted successfully"}

### Mistake Routes
@app.get("/mistakes/", response_model=List[schemas.MistakeResponse])
def read_mistakes(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_mistakes(db, skip=skip, limit=limit)

@app.post("/mistakes/", response_model=schemas.MistakeResponse)
def create_mistake(mistake: schemas.MistakeCreate, db: Session = Depends(get_db)):
    return crud.create_mistake(db=db, mistake=mistake)

@app.put("/mistakes/{mistake_id}", response_model=schemas.MistakeResponse)
def update_mistake(mistake_id: int, mistake: schemas.MistakeUpdate, db: Session = Depends(get_db)):
    updated_mistake = crud.update_mistake(db=db, mistake_id=mistake_id, mistake=mistake)
    if updated_mistake is None:
        raise HTTPException(status_code=404, detail="Mistake not found")
    return updated_mistake

@app.delete("/mistakes/{mistake_id}")
def delete_mistake(mistake_id: int, db: Session = Depends(get_db)):
    deleted_mistake = crud.delete_mistake(db=db, mistake_id=mistake_id)
    if deleted_mistake is None:
        raise HTTPException(status_code=404, detail="Mistake not found")
    return {"message": "Mistake deleted successfully"}