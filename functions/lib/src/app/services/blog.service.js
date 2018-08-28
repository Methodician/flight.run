"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const Butter = require("buttercms");
let BlogService = class BlogService {
    constructor() {
        this.butter = Butter('2c11ed1f264363ff0e0b87e0e7f30058a444fac8');
    }
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.butter.post
                .list({
                pate: 1,
                page_size: 10
            });
            // console.log(posts);
            return posts.data;
        });
    }
    getPostBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.butter.post
                    .retrieve(slug);
                // console.log(post);
                return post.data;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.butter.category.list();
                // console.log('categories', categories);
                return categories.data;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getPostsByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.butter.category.retrieve(category, { include: 'recent_posts' });
            // console.log('posts by category' + category, posts);
            return posts.data.data;
        });
    }
};
BlogService = __decorate([
    core_1.Injectable()
], BlogService);
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map