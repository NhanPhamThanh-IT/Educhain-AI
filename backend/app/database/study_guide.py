import os
from decimal import Decimal
from dotenv import load_dotenv
import psycopg
from psycopg.rows import dict_row
from datetime import datetime
from typing import List, Dict
from app.database import get_db_connection

# Study Guide Functions
def init_study_guide():
    """Initialize study_guide table"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS study_guide (
                    id SERIAL PRIMARY KEY,
                    section INTEGER[],
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            cur.execute(
                """
                CREATE TABLE IF NOT EXISTS section (
                    id SERIAL PRIMARY KEY,
                    topic TEXT NOT NULL,
                    subsection INTEGER[],
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                """
            )
            cur.execute(
                """
                CREATE TABLE IF NOT EXISTS subsection (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    content TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                """
            )
        conn.commit()

def save_section(sg_id:int, topic:str):
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO section (topic, created_at, updated_at)
                VALUES (%s, %s, %s)
                RETURNING id
                """,
                (topic, datetime.now(), datetime.now())
            )
            sec_res = cur.fetchone()
            sec_id = sec_res['id']
            cur.execute(
                """
                UPDATE study_guide
                SET section = array_append(section, %s)
                WHERE id = %s
                RETURNING *
                """,
                (sec_id,sg_id)
            )
            sg_res = cur.fetchone()
        conn.commit()
        return {"section": sec_res, "updated_course": sg_res}

def save_subsection(section_id:int, name: str, content: str):
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO subsection (name, content, created_at, updated_at)
                VALUES (%s, %s, %s, %s)
                RETURNING id
                """,
                (name, content, datetime.now(), datetime.now())
            )
            sub_res = cur.fetchone()
            sub_id = sub_res['id']
            cur.execute(
                """
                UPDATE section
                SET subsection = array_append(subsection, %s)
                WHERE id = %s
                RETURNING *
                """,
                (sub_id,sec_id)
            )
            sec_res = cur.fetchone()
        conn.commit()
        return {"subsection": sub_res, "updated_section": sec_res}

def save_study_guide(course_id:int) -> Dict:
    """Insert study guide"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO study_guide (created_at, updated_at)
                VALUES (%s, %s)
                RETURNING id
                """,
                (datetime.now(), datetime.now())
            )
            sg_res = cur.fetchone()
            sg_id = sg_res['id']
            cur.execute(
                """
                UPDATE course
                SET study_guide = array_append(study_guide, %s)
                WHERE id = %s
                RETURNING *
                """,
                (sg_id,course_id)
            )
            course_res = cur.fetchone()
        conn.commit()
        return {"study_guide": sg_res, "updated_course": course_res}


def get_study_guide_id(sg_id: int) -> Dict:
    """Get user information from database"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT * FROM study_guide WHERE id = %s",
                (sg_id,)
            )
            result = cur.fetchone()
        return result if result else None

def get_section_id(section_id: int) -> Dict:
    """Get user information from database"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT * FROM section WHERE id = %s",
                (section_id,)
            )
            result = cur.fetchone()
        return result if result else None

def get_subsection_id(sub_id: int) -> Dict:
    """Get user information from database"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT * FROM subsection WHERE id = %s",
                (sg_id,)
            )
            result = cur.fetchone()
        return result if result else None

def delete_study_guide(sg_id: int) -> bool:
    """Delete user information"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE course
                SET study_guide = array_remove(study_guide, %s)
                WHERE %s = ANY(study_guide)
                """,
                (sg_id, sg_id)
            )
            cur.execute(
                "DELETE FROM study_guide WHERE id = %s RETURNING *",
                (sg_id,)
            )
            deleted = cur.rowcount > 0
        conn.commit()
        return deleted

def delete_section(section_id: int) -> bool:
    """Delete user information"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE study_guide
                SET section = array_remove(section, %s)
                WHERE %s = ANY(section)
                """,
                (section_id, section_id)
            )
            cur.execute(
                "DELETE FROM section WHERE id = %s RETURNING *",
                (section_id,)
            )
            deleted = cur.rowcount > 0
        conn.commit()
        return deleted

def delete_subsection(sub_id: int) -> bool:
    """Delete user information"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE section
                SET subsection = array_remove(subsection, %s)
                WHERE %s = ANY(subsection)
                """,
                (sub_id, sub_id)
            )
            cur.execute(
                "DELETE FROM subsection WHERE id = %s RETURNING *",
                (sub_id,)
            )
            deleted = cur.rowcount > 0
        conn.commit()
        return deleted


