import subprocess
import sys
import os

def get_list_of_migration_names():
  files = os.listdir('db/migrations')

  migration_files = [f for f in files 
                      if f.endswith('.ts') 
                      and f != 'index.ts']

  return migration_files  

def process_migration_name(filename):
    # Remove .ts extension
    name_without_ext = filename.replace('.ts', '')
    
    # Split on '-' to get timestamp and name parts
    parts = name_without_ext.split('-')
    timestamp = parts[0]
    name_part = parts[1]
    
    words = name_part.split('_')
    pascal_case = ''.join(word.capitalize() for word in words)
    
    # Return in desired format
    return f"{pascal_case}{timestamp}"

def write_imports_to_index(files, classes):
    try:
        with open('db/migrations/index.ts', 'w') as f:
            for file_name, class_name in zip(files, classes):
                file_path = file_name.replace('.ts', '')
                import_line = f'import {{ {class_name} }} from "./{file_path}";\n'
                f.write(import_line)

            f.write('\n')
            export_line = f"export const migrations = [{', '.join(classes)}];\n"
            f.write(export_line)

        print("Successfully wrote imports to index.ts")
    except IOError as e:
        print(f"Error writing to index.ts: {e}")


if __name__ == "__main__":
  files = get_list_of_migration_names()
  classes = [process_migration_name(f) for f in files]
  write_imports_to_index(files, classes)

    
