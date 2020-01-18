/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var ObjectId = require("mongodb").ObjectId;

const Books = require("../models/Books");

module.exports = function(app) {
  app
    .route("/api/books")
    .get(async function(req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      const books = await Books.find({});
      // console.log(books);
      res.json(books);
    })

    .post(async function(req, res) {
      const { title } = req.body;
      //response will contain new book object including atleast _id and title
      if (!title) {
        return res.send("title is required");
      }
      const book = new Books({
        title
      });

      try {
        await book.save();

        res.json(book);
      } catch (error) {
        res.send("error saving book");
      }
    })

    .delete(async function(req, res) {
      //if successful response will be 'complete delete successful'
      try {
        await Books.deleteMany({});
        res.send("complete delete successful");
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

  app
    .route("/api/books/:id")
    .get(async function(req, res) {
      const bookid = req.params.id;
      try {
        const id = new ObjectId(bookid);
        if (!ObjectId.isValid(id)) {
          res.send("no book exists");
          return;
        }

        const book = await Books.findById(id);

        if (!book) {
          return res.send("no book exists");
        }

        return res.json(book);
        //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      } catch (error) {
        // console.log(error);
        res.send("no book exists");
      }
    })

    .post(async function(req, res) {
      var bookid = req.params.id;
      var comment = req.body.comment;
      try {
        const book = await Books.findById(new ObjectId(bookid));

        book.comments.push(comment);
        book.commentcount++;

        await book.save();
        return res.json(book);
      } catch (error) {
        console.log(error);
        res.send("Errror");
      }

      //json res format same as .get
    })

    .delete(async function(req, res) {
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
      try {
        await Books.findByIdAndDelete(new ObjectId(bookid));
        res.send("delete successful");
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
};
