import ast
import os

def count_function_calls(node):
    function_counts = {}
    for child in ast.walk(node):
        if isinstance(child, ast.Call):
            func_name = child.func.id if isinstance(child.func, ast.Name) else child.func.attr
            function_counts[func_name] = function_counts.get(func_name, 0) + 1
    return function_counts

def analyze_file(file_path):
    with open(file_path, 'r') as file:
        content = file.read()
    
    tree = ast.parse(content)
    function_stats = {}
    
    for node in ast.iter_child_nodes(tree):
        if isinstance(node, ast.FunctionDef):
            function_name = node.name
            function_body = ast.unparse(node)
            function_length = len(function_body.split('\n'))
            function_counts = count_function_calls(node)
            function_stats[function_name] = {
                'length': function_length,
                'counts': function_counts
            }
    
    return function_stats

def write_results(stats, output_file):
    with open(output_file, 'w') as file:
        for func_name, data in stats.items():
            file.write(f"{func_name}, {data['length']}\n")
            for called_func, count in data['counts'].items():
                file.write(f"  {called_func}: {count}\n")

def main():
    input_file = input("Enter the path to the input Python file: ")
    output_file = "result.txt"
    
    if not os.path.exists(input_file):
        print(f"Error: File '{input_file}' does not exist.")
        return
    
    stats = analyze_file(input_file)
    write_results(stats, output_file)
    print(f"Results have been written to {output_file}")

if __name__ == "__main__":
    main()
