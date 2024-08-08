from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class MistakeBase(BaseModel):
    mistake: str
    cost: str
    date: Optional[datetime]
    place: str
    solution: str

class MistakeCreate(MistakeBase):
    pass

class MistakeUpdate(MistakeBase):
    pass

class MistakeResponse(MistakeBase):
    id: int

    class Config:
        orm_mode = True
