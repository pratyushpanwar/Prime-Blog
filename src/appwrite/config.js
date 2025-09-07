import { Client, TablesDB, Storage, ID, Query } from "appwrite";
import conf from "../../config";


export class Service {
    client = new Client();
    tablesDB;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) 
            .setProject(conf.appwriteProjectId); 

            this.tablesDB = new TablesDB(this.client);
            this.bucket = new Storage(this.client);
        
    }

    //Posts CRUD

    async createPost({title, content, featuredimage, slug, status, userId}){
        try {
            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredimage,
                    status,
                    userId
                }
            })
        } catch (error) {
            console.log("Appwrite error :: createPost error", error);
            throw error;
        }
    } 

    async updatePost({title, content, featuredimage, slug, status}){
        try {
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredimage,
                    status,
                }
            })
        } catch (error) {
            console.log("Appwrite error :: updatePost error", error);
            throw error;
        }
    }

    async deletePost({slug}){
        try {
            await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
            })
            return true

        } catch (error) {
            console.log("Appwrite error :: deletePost error", error);
            return false
        }
    }

    async getPost({slug}){
        try {
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
            })
        } catch (error) {
            console.log("Appwrite error :: getPost error", error);
            throw error;
        }

    }

    async getPostsList(queries = [Query.equal("status", "published")]){
        try {
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                queries: queries
            })
        } catch (error) {
            console.log("Appwrite error :: getPostsList error", error);
            throw error;
        }
    }


    //File Storage

    async uploadFile(file){
        try {
            await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file: file,
            })
            return true;
        } catch (error) {
            console.log("Appwrite error :: uploadFile error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId: fileId,
            })
            return true;
        } catch (error) {
            console.log("Appwrite error :: deleteFile error", error);
            return false;
        }
    }

    async getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview({
                bucketId: conf.appwriteBucketId,
                fileId: fileId,
            })
            
        } catch (error) {
            console.log("Appwrite error :: getFilePreview error", error);
            return null;
        }
    }



}

const service = new Service();

export default service;