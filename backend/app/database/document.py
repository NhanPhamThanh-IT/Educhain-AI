import os
from decimal import Decimal
from dotenv import load_dotenv
import psycopg
from psycopg.rows import dict_row
from datetime import datetime
from typing import List, Dict
from app.database import get_db_connection

# Exam Functions
def init_document():
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS document (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    type VARCHAR(10) NOT NULL,
                    url TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
        conn.commit()

def save_document(course_id:int, name_doc: str, type_doc:str, url:str) -> Dict:
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO document (name, type, url, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id
                """,
                (name_doc, type_doc, url, datetime.now(), datetime.now())
            )
            doc_res = cur.fetchone()
            doc_id = doc_res['id']
            cur.execute(
                """
                UPDATE course
                SET document = array_append(document, %s)
                WHERE id = %s
                RETURNING *
                """,
                (doc_id,course_id)
            )
            course_res = cur.fetchone()
        conn.commit()
        return {"doc": doc_res, "updated_course": course_res}

def get_doc_id(doc_id: int) -> Dict:
    """Get user information from database"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT * FROM document WHERE id = %s",
                (doc_id,)
            )
            result = cur.fetchone()
        return result if result else None

def delete_doc(doc_id: int) -> bool:
    """Delete document and remove reference from course"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE course
                SET document = array_remove(document, %s)
                WHERE %s = ANY(document)
                """,
                (doc_id, doc_id)
            )

            # Xóa tài liệu khỏi bảng document
            cur.execute(
                "DELETE FROM document WHERE id = %s",
                (doc_id,)
            )
            
            deleted = cur.rowcount > 0
        conn.commit()
        return deleted
