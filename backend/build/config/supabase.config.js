"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const secrets_utils_1 = require("../utils/secrets.utils");
const supabase = (0, supabase_js_1.createClient)(secrets_utils_1.SUPABASE_URL, secrets_utils_1.SUPABASE_KEY);
exports.default = supabase;
