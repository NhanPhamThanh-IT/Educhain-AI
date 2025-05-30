import os
from decimal import Decimal
from dotenv import load_dotenv
import psycopg
from psycopg.rows import dict_row
from datetime import datetime
from typing import List, Dict, Optional

# Load environment variables
load_dotenv()

# Database configuration
DB_NAME = os.getenv("POSTGRES_DATABASE", "postgres")
DB_USER = os.getenv("POSTGRES_USER", "admintu")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD", "educhain123@")
DB_HOST = os.getenv("POSTGRES_HOST", "educhain3.postgres.database.azure.com")
DB_PORT = os.getenv("POSTGRES_PORT", 5432)

def get_db_connection():
    """
    Create a connection to the PostgreSQL database
    
    Returns:
        Connection: Database connection object
    """
    try:
        return psycopg.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT,
            row_factory=dict_row
        )
    except psycopg.Error as e:
        print(f"Error connecting to database: {e}")
        raise


