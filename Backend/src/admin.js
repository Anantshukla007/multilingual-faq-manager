const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSMongoose = require("@adminjs/mongoose");
const expressBasicAuth = require("express-basic-auth");
const mongoose = require("mongoose");
const FAQ = require("./models/FAQ");

AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
    databases: [mongoose],
    rootPath: "/admin",
    resources: [
        {
            resource: FAQ,
            options: {
                properties: {
                    question: { isTitle: true },
                    answer: { type: "richtext" },
                    translations: { type: "mixed" }
                }
            }
        }
    ]
});

// Set up authentication
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
        const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "securepassword";
        if (email === adminEmail && password === adminPassword) {
            return { email };
        }
        return null;
    },
    cookiePassword: process.env.COOKIE_SECRET || "super-secret-password",
});

module.exports = { adminJs, adminRouter };
