from typing import List

def hash_docs_id(docs_id: List[str]) -> str:
    hashed_docs_id = []

    for doc_id in docs_id:
        doc_id = doc_id.replace(" ", "").lower()
        
        def shift_char(c):
            if 'a' <= c <= 'z':
                return chr(((ord(c) - ord('a') + 3) % 26) + ord('a'))
            return c  
        
        doc_id = "".join(shift_char(c) for c in doc_id)
        hashed_docs_id.append(doc_id)    

    return hashed_docs_id  