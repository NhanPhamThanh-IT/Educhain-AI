# neo4j_model.py

class KGNode:
    """
    Represents a node in the Knowledge Graph for KAG techniques.
    """
    def __init__(self, label, properties=None):
        """
        :param label: The label (or type) of the node (e.g., "Person", "Document").
        :param properties: A dictionary of properties associated with the node.
        """
        self.label = label
        self.properties = properties or {}

    def create_query(self, var_name="n"):
        """
        Generates a Cypher query to create this node in Neo4j.

        :param var_name: The variable name to use in the query.
        :return: A tuple (query, parameters) where query is a Cypher CREATE statement.
        """
        # Build a properties string for the Cypher query using parameter substitution.
        props = ", ".join(f"{key}: ${key}" for key in self.properties.keys())
        query = f"CREATE ({var_name}:{self.label} {{{props}}}) RETURN {var_name}"
        return query, self.properties

    def __repr__(self):
        return f"<KGNode(label={self.label}, properties={self.properties})>"


class KGRelationship:
    """
    Represents a relationship between two KGNode instances in the Knowledge Graph.
    """
    def __init__(self, start_node: KGNode, end_node: KGNode, rel_type, properties=None):
        """
        :param start_node: The starting node of the relationship.
        :param end_node: The ending node of the relationship.
        :param rel_type: The type of relationship (e.g., "KNOWS", "BELONGS_TO").
        :param properties: A dictionary of properties for the relationship.
        """
        self.start_node = start_node
        self.end_node = end_node
        self.rel_type = rel_type
        self.properties = properties or {}

    def create_query(self, start_var="a", end_var="b", rel_var="r"):
        """
        Generates a Cypher query to create a relationship between two nodes.
        This method assumes that both nodes have a unique property called 'id'.

        :param start_var: Variable name for the start node in the query.
        :param end_var: Variable name for the end node in the query.
        :param rel_var: Variable name for the relationship in the query.
        :return: A tuple (query, parameters) where query is a Cypher statement.
        """
        # Create MATCH statements to locate the nodes using their unique 'id' property.
        start_match = f"MATCH ({start_var}:{self.start_node.label} {{id: $start_id}})"
        end_match = f"MATCH ({end_var}:{self.end_node.label} {{id: $end_id}})"
        # Prepare the properties string for the relationship (if any)
        props = ", ".join(f"{key}: ${key}" for key in self.properties.keys())
        props_str = f"{{{props}}}" if props else ""
        # Combine into a full CREATE query for the relationship.
        query = (
            f"{start_match}\n"
            f"{end_match}\n"
            f"CREATE ({start_var})-[{rel_var}:{self.rel_type} {props_str}]->({end_var})\n"
            f"RETURN {rel_var}"
        )
        # Build parameters using node ids and relationship properties.
        parameters = {
            "start_id": self.start_node.properties.get("id"),
            "end_id": self.end_node.properties.get("id")
        }
        parameters.update(self.properties)
        return query, parameters

    def __repr__(self):
        return f"<KGRelationship({self.start_node.label} -[{self.rel_type}]-> {self.end_node.label})>"
