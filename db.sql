CREATE TABLE IF NOT EXISTS posts ( 
        post_id VARCHAR(150) PRIMARY KEY NOT NULL, 
        title VARCHAR(70) NOT NULL,
        description VARCHAR(2000) NOT NULL,
        picture VARCHAR(150),
        author VARCHAR(50) NOT NULL,
        community_name VARCHAR(25) NOT NULL,
        liked_by VARCHAR[], /* NOTE: When I push to this array, I can get some pieces of information such as the like count i.e by getting the array length and even know those who have liked it and get a yes or no boolean value for those who have liked the post. Arrays are so powerful and give much info*/
        shared_by VARCHAR[],
        followed_by VARCHAR[] DEFAULT '{}',
        viewed_by_registered_users VARCHAR[],
        viewed_by_unregistered_users VARCHAR[],
        is_pinned_to_dashboard_array VARCHAR[],
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        CONSTRAINT posts_author_foreignkey_constraint
        FOREIGN KEY (author)
        REFERENCES users(username)
        ON DELETE NO ACTION);

-- ALTER TABLE posts ALTER COLUMN liked_by SET DEFAULT '{}'

        
        -- ALTER TABLE posts
        -- ADD CONSTRAINT posts_author_foreignkey_constraint
        -- FOREIGN KEY (author)
        -- REFERENCES users(username)
        -- ON DELETE NO ACTION
		-- ON UPDATE NO ACTION;

        ALTER TABLE posts
        ADD CONSTRAINT posts_communityName_foreignkey_constraint
        FOREIGN KEY (community_name)
        REFERENCES community(community_name)
        ON DELETE NO ACTION
		ON UPDATE NO ACTION;
        


        CREATE TABLE IF NOT EXISTS community ( 
        community_id SERIAL PRIMARY KEY NOT NULL,
        community_name VARCHAR(50) UNIQUE NOT NULL,
        creator_id VARCHAR(150) NOT NULL,
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        CONSTRAINT community_creatorName_foreignkey_constraint
        FOREIGN KEY (creator_id)
        REFERENCES users(user_id)
        ON DELETE NO ACTION
        );

        -- ALTER TABLE community
        -- ADD CONSTRAINT community_creatorName_foreignkey_constraint
        -- FOREIGN KEY (creator_name)
        -- REFERENCES users(username)
        -- ON DELETE NO ACTION
		-- ON UPDATE NO ACTION;


        CREATE TABLE IF NOT EXISTS users ( 
        user_id VARCHAR(150) PRIMARY KEY NOT NULL, 
        firstname VARCHAR(50) NOT NULL, 
        lastname VARCHAR(50), 
        username VARCHAR(50) UNIQUE NOT NULL, 
        email VARCHAR(100) UNIQUE NOT NULL, 
        password VARCHAR(100) NOT NULL, 
        profile_pic VARCHAR(150),  
        is_admin BOOLEAN DEFAULT FALSE NOT NULL, 
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL );
        
        
        CREATE TABLE IF NOT EXISTS friends ( 
        username VARCHAR(50) PRIMARY KEY NOT NULL, 
        friends_list VARCHAR[],
        followers_list VARCHAR[],
        following_list VARCHAR[], 
        CONSTRAINT friends_username_foreignkey_constraint
        FOREIGN KEY (username)
        REFERENCES users(username)
        ON DELETE NO ACTION);

   CREATE TABLE IF NOT EXISTS comments ( 
        comment_id VARCHAR(150) PRIMARY KEY NOT NULL, 
        post_id VARCHAR(150) NOT NULL, 
        community_name VARCHAR(25) NOT NULL,
        author_username VARCHAR(150), 
        is_reply BOOLEAN DEFAULT FALSE NOT NULL,
        reply_to VARCHAR(150), 
        replied_by VARCHAR[], 
        is_admin BOOLEAN DEFAULT FALSE NOT NULL, 
        comment_text VARCHAR(2500) NOT NULL, 
        liked_by VARCHAR[],
        shared_by VARCHAR[],
        followed_by VARCHAR[] DEFAULT '{}',
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        edited_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		CONSTRAINT fk_posts_and_users
        FOREIGN KEY (post_id)
        REFERENCES posts(post_id)
        );


        -- CREATE TABLE IF NOT EXISTS seen_posts ( 
        -- user_id VARCHAR(150), 
        -- posts_id VARCHAR[] PRIMARY KEY NOT NULL,  
        -- likeCount INT DEFAULT 0,  
        -- liked_by VARCHAR[],
        -- shared_by VARCHAR[],
        -- shareCount INT DEFAULT 0, 
        -- created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		-- CONSTRAINT fk_posts_and_users
        -- FOREIGN KEY (post_id)
        -- REFERENCES posts(post_id),
		-- FOREIGN KEY (author_id)
		-- REFERENCES  users(user_id)
        -- ON DELETE CASCADE);


        -- ALTER TABLE comments 
        -- ADD followed_by VARCHAR[] DEFAULT '{}';

        -- ALTER TABLE comments 
        -- DROP COLUMN shared_by;