## Ten Thousand Small Steps Server


### Endpoints

#### Login
Verify credentials and generate token

* Payload
  ```sh
  {
        email: 'test@email.com',
        password: 'fytKMvpcEri9Uqd',
  }
  ```
* 200 Result
  ```sh
  {
        success: true,
        token: token,
        userCredentials: user
  }
  ```
* 400 Result

  ```sh
  {
        types: "Not Found",
        msg: "Wrong Login Details"
  }
  ```
* 500 Result

  ```sh
  {
        type: "AHH Something Went Wrong!",
        msg: err
  }
  ```

#### Register
Create new user

* Payload
  ```sh
  {
        email: 'test@email.com',
        password: 'fytKMvpcEri9Uqd',
        phone_number: '1234567890',
        name: 'Mike Briggs',
  }
  ```
* 200 Result
  ```sh
  {
        msg: 'New User Created',
        data: createdUser,        
  }
  ```
* 500 Result
  ```sh
  {
        type: "AHH Something Went Wrong!",
        msg: err
  }
  ```

#### Upload Image
Uploads image to backend and adds reference to it in User & Image models

* Payload
  ```sh
  {
        name: req.files[0].filename,
        url: reqFiles,
        desc: "This afternoon flew by while I was consistently solving my customers problems!",
        createdAt: Date.now(),
        createdBy:user_id,
        skills: []
  }
  ```
* 201 Result
  ```sh
  {
        message: "Done Upload!",
        user: data       
  }
  ```
* 500 Result
  ```sh
  {
        msg: "AHH Something Went Wrong!",
        err: err
  }
  ```

#### Delete Image
Uploads image to backend and adds reference to it in User & Image models

* Params
  ```sh
  /:{user_id}
  ```
* 201 Result
  ```sh
  {
        message: "Done Remove!"     
  }
  ```

#### User Data
Retrieves all user data associated with the current id

* Payload
  ```sh
  {
        _id: user_id
  }
  ```
* 200 Result
  ```sh
  {
        message: "User data retrieved successfully!",
        user: data      
  }
  ```
* 500 Result
  ```sh
  {
        msg: "AHH Something Went Wrong!",
        err: err
  }
  ```

#### Image List Data
Retrieves all images associated with the current id

* Payload
  ```sh
  {
        _id: user_id
  }
  ```
* 200 Result
  ```sh
  {
        message: "Image list retrieved successfully!",
        images: data.reverse()       
  }
  ```
* 500 Result
  ```sh
  {
        msg: "AHH Something Went Wrong!",
        err: err
  }
  ```

  


