      CREATE TABLE IF NOT EXISTS posts ( 
        post_id SERIAL PRIMARY KEY NOT NULL, 
        title VARCHAR(70) NOT NULL,
        description VARCHAR(2000) NOT NULL,
        picture VARCHAR(150),
        author VARCHAR(50) NOT NULL,
        community_name VARCHAR(25) NOT NULL,
        likes INT DEFAULT 0,
        is_shared BOOLEAN DEFAULT FALSE,
        views INT DEFAULT 0,
        is_pinned_to_dashboard BOOLEAN DEFAULT FALSE,
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL);
        
        ALTER TABLE posts
        ADD CONSTRAINT posts_author_foreignkey_constraint
        FOREIGN KEY (author)
        REFERENCES users(username)
        ON DELETE NO ACTION
		ON UPDATE NO ACTION;

        ALTER TABLE posts
        ADD CONSTRAINT posts_communityName_foreignkey_constraint
        FOREIGN KEY (community_name)
        REFERENCES community(community_name)
        ON DELETE NO ACTION
		ON UPDATE NO ACTION;
        


        CREATE TABLE IF NOT EXISTS community ( 
        community_id SERIAL PRIMARY KEY NOT NULL,
        community_name VARCHAR(30) UNIQUE NOT NULL,
        creator_name VARCHAR(100) NOT NULL,
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL);

        ALTER TABLE community
        ADD CONSTRAINT community_creatorName_foreignkey_constraint
        FOREIGN KEY (creator_name)
        REFERENCES users(username)
        ON DELETE NO ACTION
		ON UPDATE NO ACTION;


        CREATE TABLE IF NOT EXISTS users ( 
        user_id SERIAL PRIMARY KEY NOT NULL, 
        firstname VARCHAR(50) NOT NULL, 
        lastname VARCHAR(50), 
        username VARCHAR(50) UNIQUE NOT NULL, 
        email VARCHAR(100) UNIQUE NOT NULL, 
        password VARCHAR(100) NOT NULL, 
        profile_pic VARCHAR(150),  
        is_admin BOOLEAN DEFAULT FALSE NOT NULL, 
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL );

