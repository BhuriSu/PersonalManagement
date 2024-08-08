from sqlalchemy.orm import Session
from . import models, schemas

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

### Mistake CRUD Operations
def get_mistakes(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Mistake).offset(skip).limit(limit).all()

def create_mistake(db: Session, mistake: schemas.MistakeCreate):
    db_mistake = models.Mistake(**mistake.dict())
    db.add(db_mistake)
    db.commit()
    db.refresh(db_mistake)
    return db_mistake

def update_mistake(db: Session, mistake_id: int, mistake: schemas.MistakeUpdate):
    db_mistake = db.query(models.Mistake).filter(models.Mistake.id == mistake_id).first()
    if db_mistake:
        for key, value in mistake.dict().items():
            setattr(db_mistake, key, value)
        db.commit()
        db.refresh(db_mistake)
    return db_mistake

def delete_mistake(db: Session, mistake_id: int):
    db_mistake = db.query(models.Mistake).filter(models.Mistake.id == mistake_id).first()
    if db_mistake:
        db.delete(db_mistake)
        db.commit()
    return db_mistake