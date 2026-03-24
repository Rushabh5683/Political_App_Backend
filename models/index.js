import User from "./user.model.js";
import Query from "./query.model.js";

User.hasMany(Query, { foreignKey: "userId" });
Query.belongsTo(User, { foreignKey: "userId" });

export { User, Query };