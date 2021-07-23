# Funcfions

1. login
    * Using authentication jwt create api signin.
2. Admin functions
    * manage users
        - Create UI Users list page
        - Create Api create, update list Users
    * manage clients
        - Create UI Clients list page
        - Create Api create, update list Clients
    * manage tasks
        - Create UI list task project
        - Create Api search, filter task
        - Create Api delete, achive task
        - Api for archive task 
    * manage projects
        - Manage project list
        - Create/Edit Project 
        - Manage People in Project 
        - Manage Tasks in Project
3. Basic User functions
    * my timesheet
        - Create Api get timesheet by day
        - Create UI timesheet by day
        - Create Api submit timesheet by week

# Database

- Users
    username
    password
    email
    name
    surname
    sex
    code
    isActive
    isStopWorking
    creation_time
    salary
    salary_at
    start_at
    phone
    address
    - branch
    - manager
    - role
    - type
    - level

- role
    name

- user_type
    name

- level
    name

- branch
    name

- clients
    name
    address

- tasks
    name
    type

- task_type
    name

- projects
    name
    code
    start_date
    end_date
    note
    - client
    - type
    - menbers
    - tasks

- project_type
    name

- timesheet
    node
    working_time
    - project
    - task
    - type

- timesheet_type
    name

# tree

* src

