#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

env_path = os.path.join(os.path.dirname(__file__), 'env.py')
if os.path.exists(env_path):
    exec(open(env_path).read())

else:
    print("env not found")

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'raptor_health.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
