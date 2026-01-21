import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js" 
import {ApiResponce} from "../utils/ApiResponce.js"

const registerUser = asyncHandler( async(req, res) => {
    // get user detail from frontend
    // validation - not empty
    // check if user already exists: username, emial 
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db 
    // remove password and refresh token field from response 
    // check for user creation 
    // return res


    const {fullName, email, userName, password} = req.body
    console.log("email: ", email);



    if (
        [fullName, userName, email, password].some((field) => 
        field?.trim() === "")
    ) {
        throw new ApiError(400, "All Fields are required")
    }
    


    const existedUser = User.findOne({
        $or: [{userName}, {email}]
    })
    if (existedUser) {
        throw new ApiError(409, "User with username and email are already exists")
    }




    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }



    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }



    const user = await User.create({
        fullName,
        avatar: avatar.url, 
        coverImage: coverImage?.url  || "",
        email,
        password,
        userName: userName.toLowerCase()
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500, "Something Went wrong while registering the user")
    }



    return res.status(201).json(
        new ApiResponce(200, createdUser, "User Register Successfully")
    )




} )


export {registerUser}  