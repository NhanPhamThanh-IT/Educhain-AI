# neo4j.py
import os
from neo4j import GraphDatabase
from neo4j.exceptions import ServiceUnavailable
# Import the KG model classes from neo4j_model.py
from app.models.neo4j_model import KGNode, KGRelationship

class Neo4jConnection:
    """
    Manages connection to a Neo4j database and provides methods to execute queries.
    """
    def __init__(self, uri, user, password):
        """
        Initialize the connection to Neo4j.
        :param uri: The URI of the Neo4j database (e.g., "bolt://localhost:7687").
        :param user: The username for authentication.
        :param password: The password for authentication.
        """
        self.uri = uri
        self.user = user
        self.password = password
        self.driver = GraphDatabase.driver(self.uri, auth=(self.user, self.password))

    def close(self):
        """
        Closes the connection to the Neo4j database.
        """
        if self.driver is not None:
            self.driver.close()

    def execute_write(self, query, parameters=None):
        """
        Executes a write transaction (e.g., CREATE, MERGE) on the database.
        :param query: The Cypher query to execute.
        :param parameters: A dictionary of parameters for the query.
        :return: The result of the query execution.
        """
        parameters = parameters or {}
        with self.driver.session() as session:
            result = session.write_transaction(lambda tx: tx.run(query, **parameters).data())
            return result

    def execute_read(self, query, parameters=None):
        """
        Executes a read transaction (e.g., MATCH) on the database.
        :param query: The Cypher query to execute.
        :param parameters: A dictionary of parameters for the query.
        :return: The result of the query execution.
        """
        parameters = parameters or {}
        with self.driver.session() as session:
            result = session.read_transaction(lambda tx: tx.run(query, **parameters).data())
            return result

    def delete_all_neo4j(self):
        try:
            # Kết nối đến Neo4j
            driver = GraphDatabase.driver(uri, auth=(user, password))

            # Thực hiện truy vấn Cypher để xóa tất cả nodes và relationships
            def delete_all(tx):
                tx.run("MATCH (n) DETACH DELETE n")

            with driver.session() as session:
                session.write_transaction(delete_all)
                print("Tất cả dữ liệu trong Neo4j đã bị xóa.")

        except Exception as e:
            print(f"Lỗi khi kết nối hoặc xóa dữ liệu: {e}")
        finally:
            driver.close()


# --------------------------
# Example usage of the Neo4jConnection and KG model:
# --------------------------
if __name__ == "__main__":
    # Replace these credentials with your actual Neo4j connection details.
    uri = "neo4j+s://3aecad3c.databases.neo4j.io"
    user = "neo4j"
    password = "0L_nAMZmeBpDiCYM24uCCfdulk_nEKFUHdBkgNfqlyY"

    # Establish a connection to the Neo4j database.
    conn = Neo4jConnection(uri, user, password)

    try:
        # # Example: Create two nodes representing entities in the knowledge graph.
        # node1 = KGNode(label="Person", properties={"id": "1", "name": "Alice"})
        # node2 = KGNode(label="Person", properties={"id": "2", "name": "Bob"})

        # # Create node1
        # query1, params1 = node1.create_query(var_name="a")
        # print("Executing query for node1:", query1, params1)
        # result1 = conn.execute_write(query1, params1)
        # print("Result node1:", result1)

        # # Create node2
        # query2, params2 = node2.create_query(var_name="b")
        # print("Executing query for node2:", query2, params2)
        # result2 = conn.execute_write(query2, params2)
        # print("Result node2:", result2)

        # # Example: Create a relationship between node1 and node2.
        # relationship = KGRelationship(
        #     start_node=node1,
        #     end_node=node2,
        #     rel_type="KNOWS",
        #     properties={"since": 2020}
        # )
        # query_rel, params_rel = relationship.create_query(start_var="a", end_var="b", rel_var="r")
        # print("Executing query for relationship:", query_rel, params_rel)
        # result_rel = conn.execute_write(query_rel, params_rel)
        # print("Result relationship:", result_rel)

        # # Optional: Execute a read query to verify the nodes.
        # read_query = "MATCH (p:Person) RETURN p"
        # read_result = conn.execute_read(read_query)
        # print("Read result:", read_result)
        conn.delete_all_neo4j()
    except ServiceUnavailable as e:
        print("Neo4j service is unavailable:", e)
    finally:
        conn.close()
