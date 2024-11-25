from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from transformers import pipeline
from django.http import JsonResponse

# Example models representing your private data
from .models import UserDocument, Project, UserNote

@csrf_exempt
@login_required
@require_POST
def rag_chat_view(request):
    try:
        data = request.body
        user_query = data.get('message', '')

        # Step 1: Retrieve Relevant Private Data
        relevant_docs = retrieve_relevant_documents(request.user, user_query)
        
        # Step 2: Prepare Context from Retrieved Documents
        context = prepare_context(relevant_docs)
        
        # Step 3: Generate Response using RAG
        answer = generate_rag_response(user_query, context)
        
        return JsonResponse({
            'message': answer,
            'sources': [doc.title for doc in relevant_docs]
        })
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

def retrieve_relevant_documents(user, query, top_k=3):
    """
    Retrieve most relevant documents for the user's query
    from multiple private data sources
    """
    # Use semantic search across different models
    documents = []
    
    # Search UserDocuments
    doc_matches = UserDocument.objects.filter(
        user=user
    ).search(query).order_by('-relevance')[:top_k]
    
    # Search Projects
    project_matches = Project.objects.filter(
        owner=user
    ).search(query).order_by('-relevance')[:top_k]
    
    # Search User Notes
    note_matches = UserNote.objects.filter(
        user=user
    ).search(query).order_by('-relevance')[:top_k]
    
    documents.extend(doc_matches)
    documents.extend(project_matches)
    documents.extend(note_matches)
    
    return documents[:top_k]

def prepare_context(documents):
    """
    Consolidate retrieved documents into a single context string
    """
    context = ""
    for doc in documents:
        context += f"Source: {doc.title}\n{doc.content}\n\n"
    return context

def generate_rag_response(query, context):
    """
    Use transformer model to generate response using context
    """
    qa_pipeline = pipeline(
        "text-generation", 
        model="facebook/opt-350m",
        max_new_tokens=150
    )
    
    prompt = f"""
    Context: {context}
    
    Question: {query}
    
    Based on the provided context, answer the following question precisely and concisely:
    """
    
    response = qa_pipeline(prompt)[0]['generated_text']
    return response.split("Question:")[-1].strip()