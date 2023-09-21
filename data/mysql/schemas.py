from datetime import date
from typing import Optional

from pydantic import BaseModel

class todoReq(BaseModel):
    memberId: int
    todoDate: date
