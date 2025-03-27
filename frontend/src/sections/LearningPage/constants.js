export const botMessages = [
    `Welcome, **Gia Bao**! 👋 I'm here to assist you with anything related to **Visual Data Retrieval** course. Feel free to ask, and I'll do my best to help! 🤖`,

    `## 📌 What is CLIP Model and How to Use it with FAISS  
**CLIP (Contrastive Language-Image Pretraining)** is an AI model by OpenAI that understands images and text together.  
It converts both into a shared embedding space, enabling similarity searches between text and images.
### 🚀 Using CLIP with FAISS for Image Search  
**1. Load CLIP model**
\`\`\`python
from sentence_transformers import SentenceTransformer
model = SentenceTransformer("clip-ViT-B-32")
\`\`\`
**2. Extract embeddings**
\`\`\`python
image_embedding = model.encode(["image_path"])
text_embedding = model.encode(["search query"])
\`\`\`
**3. Index embeddings with FAISS**
\`\`\`python
import faiss
index = faiss.IndexFlatL2(512)  # 512D for CLIP ViT-B/32
index.add(image_embedding)
\`\`\`
**4. Search**
\`\`\`python
_, indices = index.search(text_embedding, k=5)  # Get top 5 matches
\`\`\`

✅ This enables **fast image retrieval** using CLIP and FAISS! 🔥`
];

export const chatSuggestions = [
    "What is the top themes of this article?",
    "Enhance the model's performance!",
    "What is the conclusion?",
  ];