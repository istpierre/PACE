

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    salt VARCHAR(100) NOT NULL,
    hash VARCHAR(128) NOT NULL
);


CREATE TABLE projects (
    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    name VARCHAR(100) not null,
    description TEXT,
    created_by BIGINT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE project_status (
    project_id  BIGINT NOT NULL,
    status VARCHAR(50),
    created_by BIGINT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE tasks (
  id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  project_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  assigned_to BIGINT,
  due_date TIMESTAMPTZ,
  created_by BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id),
  FOREIGN KEY (assigned_to) REFERENCES users(id)
);

CREATE TABLE task_status (
    task_id  BIGINT NOT NULL,
    status VARCHAR(50),
    created_by BIGINT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id)
);




