import os
import subprocess

def build_vue_project():
    print("Building Vue project...")
    subprocess.run(["npm", "run", "build"], check=True)

def insert_manifest_link():
    print("Inserting manifest link into index.html...")
    manifest_link = '<link rel="manifest" href="manifest.json">'
    with open("heroku/index.html", "r") as file:
        content = file.read()

    # Insert the manifest link into the head section without a new line
    head_end = content.find("</head>")
    if head_end != -1:
        content = content[:head_end] + manifest_link + content[head_end:]

    with open("heroku/index.html", "w") as file:
        file.write(content)
        file.flush()


def copy_files_to_heroku():
    print("Copying files to Heroku folder...")
    os.system(f"xcopy /E /I dist heroku")

def deploy_to_heroku():
    print("Deploying to Heroku...")
    os.chdir('heroku')
    subprocess.run(["git", "add", "."], check=True)
    subprocess.run(["git", "commit", "-m", "Deploy"], check=True)
    subprocess.run(["git", "push", "heroku", "main"], check=True)

if __name__ == "__main__":
    build_vue_project()
    copy_files_to_heroku()
    insert_manifest_link()
    deploy_to_heroku()
    print("Deployment completed.")
