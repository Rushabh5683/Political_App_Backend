import User from "./user.model.js";
import Query from "./query.model.js";
import WorksDone from "./worksDone.js";
import Media from "./media.model.js";

// One User → Many Queries
User.hasMany(Query, {
  foreignKey: "userId",
});

// Each Query → belongs to User
Query.belongsTo(User, {
  foreignKey: "userId",
});

WorksDone.belongsTo(Media, {
  foreignKey: "media_id",
  as: "media"
});

Media.hasMany(WorksDone, {
  foreignKey: "media_id"
});

export { User, Query, WorksDone, Media };