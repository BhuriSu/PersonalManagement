from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import datetime

Base = declarative_base()

class Goal(Base):
    __tablename__ = "goals"
    id = Column(Integer, primary_key=True, index=True)
    goal = Column(String, index=True)
    how = Column(String, index=True)
    date = Column(DateTime, default=datetime.datetime.utcnow)
    place = Column(String)

DATABASE_URL = "postgresql://user:password@localhost/yourdatabase"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)