import { User, Users } from "../users";
const users = new Users();

describe("Users Model", () => {
  // Clear DB after all
  afterAll(async () => {
    await users.deleteAllUsers();
  });

  it("should have a getUser() method", () => {
    expect(users.getUser).toBeDefined();
  });

  it("should have a getUsers() method", () => {
    expect(users.getUsers).toBeDefined();
  });

  it("should have a getUserByUsername() method", () => {
    expect(users.getUserByUsername).toBeDefined();
  });

  it("should have a createUser() method", () => {
    expect(users.createUser).toBeDefined();
  });

  it("createUser method should create a new User", async () => {
    const result = await users.createUser({
      firstname: "John",
      lastname: "Doe",
      password: "JohnDoe@2023",
      username: "johndoe"
    });

    expect(result).toEqual({
      id: 1,
      firstname: "John",
      lastname: "Doe",
      password: "JohnDoe@2023",
      username: "johndoe"
    });
  });

  it("getUsers method should return a list of users", async () => {
    const result = await users.getUsers();
    expect(result).toEqual([
      {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        password: "JohnDoe@2023",
        username: "johndoe"
      }
    ]);
  });

  it("getUser method should return a single user", async () => {
    const result = await users.getUser(1);
    expect(result).toEqual({
      id: 1,
      firstname: "John",
      lastname: "Doe",
      password: "JohnDoe@2023",
      username: "johndoe"
    });
  });

  it("getUserByUsername should get a user by username", async () => {
    const result = await users.getUserByUsername("johndoe");
    expect(result).toEqual({
      id: 1,
      firstname: "John",
      lastname: "Doe",
      password: "JohnDoe@2023",
      username: "johndoe"
    });
  });
});
