from datetime import datetime
from typing import Optional

from pydantic import BaseModel

class todoReq(BaseModel):
    id: int
    date: datetime
