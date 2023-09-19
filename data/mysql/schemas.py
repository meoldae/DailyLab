import datetime
from typing import Optional

from pydantic import BaseModel

class getTodo(BaseModel):
    id: int