# kag_usage.py

"""
This script demonstrates how to use KAG techniques to create a Knowledge Graph (KG)
and perform retrieval and reasoning queries using Neo4j as the storage backend.

Prerequisites:
  - neo4j_model.py: Defines KGNode and KGRelationship classes.
  - neo4j.py: Provides a Neo4jConnection class to manage database connectivity.
  - Neo4j Python driver installed: pip install neo4j
"""

from neo4j import GraphDatabase
from neo4j_model import KGNode, KGRelationship
from neo4j import Neo4jConnection  # from neo4j.py

def create_knowledge_graph(conn: Neo4jConnection):
    """
    Creates a sample knowledge graph in the Neo4j database.
    The KG includes nodes (people) and relationships (KNOWS).
    """
    # Define sample nodes with unique "id" properties.
    alice = KGNode("Person", {"id": "1", "name": "Alice"})
    bob   = KGNode("Person", {"id": "2", "name": "Bob"})
    carol = KGNode("Person", {"id": "3", "name": "Carol"})
    
    # Create the nodes in the database.
    # (Here we use different variable names in the Cypher CREATE query.)
    for node, var in [(alice, "a"), (bob, "b"), (carol, "c")]:
        query, params = node.create_query(var_name=var)
        print(f"Creating node {node}:")
        result = conn.execute_write(query, params)
        print("Result:", result)
    
    # Define relationships between nodes.
    # For relationship creation, the nodes are matched by their unique "id" property.
    knows_ab = KGRelationship(
        start_node=alice,
        end_node=bob,
        rel_type="KNOWS",
        properties={"since": 2018}
    )
    knows_bc = KGRelationship(
        start_node=bob,
        end_node=carol,
        rel_type="KNOWS",
        properties={"since": 2019}
    )
    
    # Create the relationship from Alice to Bob.
    query_ab, params_ab = knows_ab.create_query(start_var="a", end_var="b", rel_var="r1")
    print(f"\nCreating relationship {knows_ab}:")
    result_ab = conn.execute_write(query_ab, params_ab)
    print("Result:", result_ab)
    
    # Create the relationship from Bob to Carol.
    query_bc, params_bc = knows_bc.create_query(start_var="b", end_var="c", rel_var="r2")
    print(f"\nCreating relationship {knows_bc}:")
    result_bc = conn.execute_write(query_bc, params_bc)
    print("Result:", result_bc)


def retrieve_knowledge(conn: Neo4jConnection):
    """
    Retrieves data from the KG. For example, it fetches all Person nodes and their KNOWS relationships.
    """
    query = """
    MATCH (p1:Person)-[r:KNOWS]->(p2:Person)
    RETURN p1.name AS from, p2.name AS to, r.since AS since
    """
    result = conn.execute_read(query)
    print("\nRetrieved relationships from the KG:")
    for record in result:
        print(record)
    return result


def perform_reasoning(conn: Neo4jConnection, person_name: str):
    """
    Demonstrates a simple reasoning query.
    For example: Given a person (e.g., "Alice"), find all people indirectly connected
    via two consecutive KNOWS relationships (friends-of-friends).
    """
    query = """
    MATCH (p:Person {name: $person_name})-[:KNOWS]->()-[:KNOWS]->(friend:Person)
    RETURN friend.name AS friend
    """
    result = conn.execute_read(query, {"person_name": person_name})
    print(f"\nReasoning result for {person_name} (friends-of-friends):")
    for record in result:
        print(record)
    return result


if __name__ == "__main__":
    # Replace these credentials with your actual Neo4j instance details.
    uri = "bolt://localhost:7687"
    user = "neo4j"
    password = "password"
    
    # Establish the connection to the Neo4j database.
    conn = Neo4jConnection(uri, user, password)
    
    try:
        # Optionally, clear the database to start fresh.
        print("Clearing existing data in the database...")
        conn.execute_write("MATCH (n) DETACH DELETE n")
        
        # Create the Knowledge Graph using KAG techniques.
        print("\n=== Creating Knowledge Graph ===")
        create_knowledge_graph(conn)
        
        # Retrieve the KG data.
        print("\n=== Retrieving Knowledge Graph Data ===")
        retrieve_knowledge(conn)
        
        # Perform a reasoning query.
        print("\n=== Performing Reasoning Query ===")
        perform_reasoning(conn, person_name="Alice")
        
    except Exception as e:
        print("An error occurred:", e)
    finally:
        conn.close()
