
from haystack.components import PromptBuilder
from haystack.components.embedders import SentenceTransformersDocumentEmbedder, SentenceTransformersTextEmbedder
from haystack.components.retrievers import InMemoryEmbeddingRetriever
from haystack.dataclasses import Document
from .models import Goal, Mistake, Deal, Profile, Urgency
import json

class WebsiteDataIndexer:
    def __init__(self):
        self.document_embedder = SentenceTransformersDocumentEmbedder()
        self.retriever = InMemoryEmbeddingRetriever(top_k=3)
        
    def create_documents(self):
        documents = []
        
        # Convert Goals to documents
        goals = Goal.objects.all()
        for goal in goals:
            content = {
                'type': 'goal',
                'Goal': goal.Goal,
                'How': goal.How,
                'Date': str(goal.Date),
                'Place': goal.Place,
            }
            doc = Document(content=json.dumps(content))
            documents.append(doc)
            
        mistakes = Mistake.objects.all()
        for mistake in mistakes:
            content = {
                'type': 'mistake',
                'Mistake': mistake.Mistake,
                'Cost': mistake.Cost,
                'Date': str(mistake.Date),
                'Place': mistake.Place,
                'Solution': mistake.Solution,
            }
            doc = Document(content=json.dumps(content))
            documents.append(doc)
        
        deals = Deal.objects.all()
        for deal in deals:
            content = {
                'type': 'deal',
                'Name': deal.Name,
                'Deal': deal.Deal,
                'Date': str(deal.Date),
                'Place': deal.Place,
                'Money': deal.Money,
                'Profit': deal.Profit,
            }
            doc = Document(content=json.dumps(content))
            documents.append(doc)

        profiles = Profile.objects.all()
        for profile in profiles:
            content = {
                'type': 'profile',
                'Name': profile.Name,
                'Age': profile.Age,
                'Date': str(profile.Date),
                'Place': profile.Place,
                'About': profile.About,
            }
            doc = Document(content=json.dumps(content))
            documents.append(doc)
        
        urgencies = Urgency.objects.all()
        for urgency in urgencies:
            content = {
                'type': 'urgency',
                'Urgency': urgency.Urgency,
                'Information': urgency.Information,
            }
            doc = Document(content=json.dumps(content))
            documents.append(doc)
        # Add other model data as needed...
        
        return documents
        
    def index_data(self):
        documents = self.create_documents()
        embedded_documents = self.document_embedder.embed(documents)
        self.retriever.write(embedded_documents)
        return len(documents)

class RAGPipeline:
    def __init__(self):
        self.text_embedder = SentenceTransformersTextEmbedder()
        self.retriever = InMemoryEmbeddingRetriever(top_k=3)
        self.prompt_builder = PromptBuilder(
            template="""Given the following context and question, provide a natural answer:
            Context: {documents}
            Question: {query}
            Answer:"""
        )
        
    def query(self, question):
        embedded_query = self.text_embedder.embed(question)
        relevant_docs = self.retriever.retrieve(embedded_query)
        
        # Extract relevant information from documents
        context = []
        for doc in relevant_docs:
            data = json.loads(doc.content)
            if data['type'] == 'goal':
                context.append(f"Goal: {data['Goal']}\n Date: {data['Date']}\n"
                             f"Place: {data['Place']}\nHow: {data['How']}")
        
        for doc in relevant_docs:
            data = json.loads(doc.content)
            if data['type'] == 'mistake':
                context.append(f"Mistake: {data['Mistake']}\n Date: {data['Date']}\n"
                             f"Place: {data['Place']}\nCost: {data['Cost']}\nSolution: {data['Solution']}")
        
        for doc in relevant_docs:
            data = json.loads(doc.content)
            if data['type'] == 'deal':
                context.append(f"Deal: {data['Deal']}\n Date: {data['Date']}\n Name: {data['Name']}\n"
                             f"Place: {data['Place']}\nMoney: {data['Money']}\n Profit: {data['Profit']}")
                
        for doc in relevant_docs:
            data = json.loads(doc.content)
            if data['type'] == 'profile':
                context.append(f"Profile: {data['Profile']}\n Date: {data['Date']}\n Name: {data['Name']}\n Age: {data['Age']}\n"
                             f"Place: {data['Place']}\nHow: {data['How']} About: {data['About']}")
        
        for doc in relevant_docs:
            data = json.loads(doc.content)
            if data['type'] == 'urgency':
                context.append(f"Urgency: {data['Urgency']}\n "
                             f"Information: {data['Information']}")
        
        # Build response using context
        response = self.prompt_builder.invoke(
            documents="\n".join(context),
            query=question
        )
        
        return response