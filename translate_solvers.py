import ast
import json
import re
def function_to_mermaid(func_ast):
    """
    Convert a function AST to Mermaid graph syntax.
    """
    graph = ["graph TD"]
    variables = {}
    dependencies = {}

    for node in ast.walk(func_ast):
        if isinstance(node, ast.Assign):
            target = node.targets[0].id
            if isinstance(node.value, ast.Call):
                func_name = node.value.func.id
                variables[target] = func_name
                graph.append(f"    {target}[{func_name}]")
                dependencies[target] = [arg.id for arg in node.value.args if isinstance(arg, ast.Name)]

    # Add input node
    input_var = func_ast.args.args[0].arg
    graph.append(f"    {input_var}[{input_var}]")

    # # Add output node
    # output_var = func_ast.body[-1].value.id
    # graph.append(f"    {output_var}[{output_var}]")

    # Connect nodes based on dependencies
    for var, deps in dependencies.items():
        for dep in deps:
            graph.append(f"    {dep} --> {var}")

    # # Connect input to first operation and last operation to output
    # first_op = list(variables.keys())[0]
    # graph.append(f"    {input_var} --> {first_op}")
    # graph.append(f"    {list(variables.keys())[-1]} --> {output_var}")

    # Connect the last variable to the output 'O'
    last_var = list(variables.keys())[-1]
    graph.append(f"    {last_var} --> Output")
    graph.append(f"    Output[Output]")
    graph.append(f"    style Output fill:#f9f,stroke:#333,stroke-width:2px")

    # Style input and output nodes
    graph.append(f"    style {input_var} fill:#f9f,stroke:#333,stroke-width:2px")
    # graph.append(f"    style {list(variables.keys())[-1]} fill:#f9f,stroke:#333,stroke-width:2px")
    

    return "\n".join(graph)

def process_python_file(file_path):
    """
    Process a Python file containing multiple functions and output a JSONL file
    with Mermaid graph representations for each function.
    """
    with open(file_path, 'r') as file:
        content = file.read()
    
    module = ast.parse(content)
    
    output = []
    for node in module.body:
        if isinstance(node, ast.FunctionDef):
            func_name = node.name
            if re.match(r'solve_[0-9a-f]{8}', func_name):
                mermaid_graph = function_to_mermaid(node)
                function_text = ast.unparse(node)
                num_lines = len(function_text.split('\n'))
                output.append({
                    "name": func_name[6:],  # Remove 'solve_' prefix
                    "graph": mermaid_graph,
                    "function": function_text,
                    "line_count": num_lines
                })
    
    output_file = file_path.rsplit('.', 1)[0] + '_graphs.jsonl'
    with open(output_file, 'w') as file:
        for item in output:
            json.dump(item, file)
            file.write('\n')
    
    return output_file

# Example usage:
# output_file = process_python_file('path/to/your/python_file.py')
# print(f"JSONL file created: {output_file}")


if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1:
        input_file = sys.argv[1]
    else:
        input_file = "./solvers.py"

    output_file = process_python_file(input_file)
    print(f"JSONL file created: {output_file}")
