from sqlalchemy.orm import Session
from . import models

def get_goals(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Goal).offset(skip).limit(limit).all()

def create_goal(db: Session, goal: models.Goal):
    db.add(goal)
    db.commit()
    db.refresh(goal)
    return goal

def update_goal(db: Session, goal_id: int, updated_goal: dict):
    goal = db.query(models.Goal).filter(models.Goal.id == goal_id).first()
    if goal:
        for key, value in updated_goal.items():
            setattr(goal, key, value)
        db.commit()
        db.refresh(goal)
    return goal

def delete_goal(db: Session, goal_id: int):
    goal = db.query(models.Goal).filter(models.Goal.id == goal_id).first()
    if goal:
        db.delete(goal)
        db.commit()
    return goal