#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
    os.environ.setdefault("DJANGO_CONFIGURATION", "Local")

    """is_testing = 'test' in sys.argv

    if is_testing:
        import coverage
        cov = coverage.coverage(source=['woodshop'], omit=['*test*',
                                                           '*migrations*',
                                                           '*Envs/*',
                                                           '*urls*',
                                                           '*admin*',
                                                           './config/*',
                                                           './manage.py',
                                                           '*__init__*',
                                                            '*fabfile*',
                                                            '*users/views.py',
                                                            '*management/*'
                                                        ])
        cov.erase()
        cov.start()"""

    from configurations.management import execute_from_command_line

    execute_from_command_line(sys.argv)

    """if is_testing:
        cov.stop()
        cov.save()
        cov.report()
        cov.html_report(directory='covhtml')"""
