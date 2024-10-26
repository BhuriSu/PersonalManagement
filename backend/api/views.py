from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
import uuid
import logging
from django.core.cache import cache
from langchain_core.messages import AIMessage, HumanMessage
from langchain_community.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain

### Goal 

@api_view(['GET'])
def get_goals(request):
    goals = Goal.objects.all()
    serializer = GoalSerializer(goals, many=True).data
    return Response(serializer)

@api_view(['POST'])
def create_goal(request):
    serializer = GoalSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_goal(request, pk):
    try:
        goal = Goal.objects.get(pk=pk)
    except Goal.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = GoalSerializer(goal, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_goal(request, pk):
    try:
        goal = Goal.objects.get(pk=pk)
    except Goal.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    goal.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    

### Mistake

@api_view(['GET'])
def get_mistakes(request):
    mistakes = Mistake.objects.all()
    serializer = MistakeSerializer(mistakes, many=True).data
    return Response(serializer)

@api_view(['POST'])
def create_mistake(request):
    serializer = MistakeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_mistake(request, pk):
    try:
        mistake = Mistake.objects.get(pk=pk)
    except Mistake.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = MistakeSerializer(mistake, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_mistake(request, pk):
    try:
        mistake = Mistake.objects.get(pk=pk)
    except Mistake.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    mistake.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    
### Profile

@api_view(['GET'])
def get_profiles(request):
    profiles =  Profile.objects.all()
    serializer = ProfileSerializer(profiles, many=True).data
    return Response(serializer)

@api_view(['POST'])
def create_profile(request):
    serializer = ProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_profile(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ProfileSerializer(profile, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_profile(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    profile.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

### Deal

@api_view(['GET'])
def get_deals(request):
    deals =  Deal.objects.all()
    serializer = DealSerializer(deals, many=True).data
    return Response(serializer)

@api_view(['POST'])
def create_deal(request):
    serializer = DealSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_deal(request, pk):
    try:
        deal = Deal.objects.get(pk=pk)
    except Deal.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = DealSerializer(deal, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_deal(request, pk):
    try:
        deal = Deal.objects.get(pk=pk)
    except Deal.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    deal.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

### Map

@api_view(['GET'])
def get_maps(request):
    maps =  Map.objects.all()
    serializer = MapSerializer(maps, many=True).data
    return Response(serializer)

@api_view(['POST'])
def create_map(request):
    serializer = MapSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_map(request, pk):
    try:
        map = Map.objects.get(pk=pk)
    except Map.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    map.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    
### Conversation

@api_view(['GET'])
def get_conversations(request):
    conversations =  Conversation.objects.all()
    serializer = ConversationSerializer(conversations, many=True).data
    return Response(serializer)

@api_view(['POST'])
def create_conversation(request):
    serializer = ConversationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_conversation(request, pk):
    try:
        conversation = Conversation.objects.get(pk=pk)
    except conversation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ConversationSerializer(conversation, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_conversation(request, pk):
    try:
        conversation = Conversation.objects.get(pk=pk)
    except conversation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    conversation.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    
### Urgency


@api_view(['GET'])
def get_urgencies(request):
    urgencies =  Urgency.objects.all()
    serializer = UrgencySerializer(urgencies, many=True).data
    return Response(serializer)

@api_view(['POST'])
def create_urgency(request):
    serializer = UrgencySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_urgency(request, pk):
    try:
        urgency = Urgency.objects.get(pk=pk)
    except Urgency.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = UrgencySerializer(urgency, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_urgency(request, pk):
    try:
        urgency = Urgency.objects.get(pk=pk)
    except Urgency.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    urgency.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


logger = logging.getLogger(__name__)

def get_vectorstore_from_url(url):
    # Get the text in document form
    loader = WebBaseLoader(url)
    document = loader.load()
    
    # Split the document into chunks
    text_splitter = RecursiveCharacterTextSplitter()
    document_chunks = text_splitter.split_documents(document)
    
    # Create a vector store from the chunks
    vector_store = Chroma.from_documents(document_chunks, OpenAIEmbeddings())
    
    return vector_store

def get_context_retriever_chain(vector_store):
    llm = ChatOpenAI()
    
    retriever = vector_store.as_retriever()
    
    prompt = ChatPromptTemplate.from_messages([
        MessagesPlaceholder(variable_name="chat_history"),
        ("user", "{input}"),
        ("user", "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation")
    ])
    
    retriever_chain = create_history_aware_retriever(llm, retriever, prompt)
    
    return retriever_chain

def get_conversational_rag_chain(retriever_chain):
    llm = ChatOpenAI()
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", "Answer the user's questions based on the below context:\n\n{context}"),
        MessagesPlaceholder(variable_name="chat_history"),
        ("user", "{input}"),
    ])
    
    stuff_documents_chain = create_stuff_documents_chain(llm, prompt)
    
    return create_retrieval_chain(retriever_chain, stuff_documents_chain)

@api_view(['POST'])
def initialize_chat(request):
    try:
        data = request.data
        website_url = data.get('website_url')
        
        if not website_url:
            return Response({'error': 'Please provide a website URL'}, status=400)
        
        # Generate a unique session ID
        session_id = str(uuid.uuid4())
        
        # Initialize vector store and handle potential errors
        try:
            vector_store = get_vectorstore_from_url(website_url)
        except Exception as e:
            return Response({'error': f'Failed to load vector store: {str(e)}'}, status=500)
        
        # Store in cache with session ID
        cache.set(f'vector_store_{session_id}', vector_store, timeout=3600)  # 1 hour timeout
        cache.set(f'chat_history_{session_id}', [], timeout=3600)
        
        return Response({
            'session_id': session_id,
            'message': 'Chat initialized successfully'
        })
    except Exception as e:
        return Response({'error': f'Unexpected error: {str(e)}'}, status=500)

@api_view(['POST'])
def chat_message(request):
    logger.debug(f"Request data: {request.data}")  # Log the incoming request data
    try:
        data = request.data
        message = data.get('message')
        session_id = data.get('session_id')
        
        if not message or not session_id:
            logger.warning("Missing message or session_id")
            return Response({'error': 'Please provide message and session_id'}, status=400)
        
        # Retrieve vector store and chat history from cache
        vector_store = cache.get(f'vector_store_{session_id}')
        chat_history = cache.get(f'chat_history_{session_id}', [])
        
        if not vector_store:
            logger.warning("Chat session expired or not initialized")
            return Response({'error': 'Chat session expired or not initialized'}, status=400)
        
        # Convert chat history to LangChain format
        langchain_history = []
        for msg in chat_history:
            if msg['isUser']:
                langchain_history.append(HumanMessage(content=msg['message']))
            else:
                langchain_history.append(AIMessage(content=msg['message']))
        
        # Get response using RAG chain
        retriever_chain = get_context_retriever_chain(vector_store)
        conversation_chain = get_conversational_rag_chain(retriever_chain)
        
        response = conversation_chain.invoke({
            "chat_history": langchain_history,
            "input": message
        })
        
        # Update chat history
        chat_history.append({'message': message, 'isUser': True})
        chat_history.append({'message': response['answer'], 'isUser': False})
        cache.set(f'chat_history_{session_id}', chat_history, timeout=3600)
        
        return Response({
            'response': response['answer'],
            'chat_history': chat_history
        })
    except Exception as e:
        logger.exception("An error occurred in chat_message")  # Log the exception with a traceback
        return Response({'error': str(e)}, status=500)