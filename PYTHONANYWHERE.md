# Deploying to PythonAnywhere

## Prerequisites
- PythonAnywhere account (https://www.pythonanywhere.com/)
- Git installed on your local machine

## Deployment Steps

1. **Build your frontend**
   ```bash
   npm install
   npm run build
   ```

2. **Push your code to a Git repository** (GitHub, GitLab, etc.)

3. **On PythonAnywhere:**
   - Go to the Web tab and create a new web app
   - Select "Manual Configuration" (not "Flask")
   - Choose Python 3.10 (or the latest available)
   - In the "Code" section, clone your repository
   - Go to the "Virtualenv" section and create a new virtual environment:
     ```
     mkvirtualenv --python=/usr/bin/python3.10 venv
     ```
   - Install requirements:
     ```
     pip install -r requirements.txt
     ```
   - Go to the Web tab and edit the WSGI configuration file
   - Replace the content with the content of `wsgi.py`
   - In the Web tab, set the path to your virtual environment:
     ```
     /home/yourusername/yourproject/venv
     ```
   - Set the working directory to your project directory
   - Reload your web app

## Environment Variables
If your app needs environment variables, add them to the WSGI configuration file or in the Web tab under "Code" > "Environment variables"
