import subprocess

packages = [
    'pathlib2',
    'pip',
    'setuptools',
    'wheel',
]

pip_only_packages = [
    'pre-commit',
]

dependencies = '{{ cookiecutter.dependency_file }}'

def write_dependencies():
    with open(dependencies, 'w') as f:
        lines = sorted(packages + pip_only_packages)

        lines += [
            ""
            "-e ."
        ]

        f.write("\n".join(lines))
        f.write("\n")

write_dependencies()
remote = '{{cookiecutter.git_remote}}'
branch_name = 'feat/initialized-using-cookiecutter'
subprocess.call(['git', 'init'])
subprocess.call(['git', 'add', '.'])
subprocess.call(['git', 'commit', '-m', 'initializatin using cookiecutter'])
subprocess.call(['git', 'checkout', '-b', branch_name])
if remote != 'Git remote (if known)':
    subprocess.call(['git', 'remote', 'add', 'origin', remote])
    subprocess.call(['git', 'push', '-u', 'origin', branch_name])