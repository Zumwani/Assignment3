const { GraphQLSchema, GraphQLObjectType , GraphQLID, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");
const Product = require("../../models/Product");

//#region Types

const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: () => ({
        _id:            { type: GraphQLID },
        name:           { type: GraphQLString },
        category:       { type: GraphQLString },
        price:          { type: GraphQLString },
        tag:            { type: GraphQLString },
        rating:         { type: GraphQLInt },
        description:    { type: GraphQLString },
        imageName:      { type: GraphQLString }
    })
});

//#endregion
//#region Get
  
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: { 
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(_, args) {
                return Product.findById(args.id);
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            async resolve(_, _1) {
                return (await Product.find({  }));
            }
        }
    }
});

//#endregion
//#region Mutate

const Mutation = new GraphQLObjectType({
    name: "Mutation", 
    fields: {
        addProduct: {
            type: ProductType,
            args: {
                name:           { type: GraphQLString },
                price:          { type: GraphQLString },
                category:       { type: GraphQLString },
                tag:            { type: GraphQLString },
                rating:         { type: GraphQLInt },
                description:    { type: GraphQLString },
                imageName:      { type: GraphQLString }
            },
            resolve(_, args) {
                const product = new Product({
                    name: args.name,
                    price: args.price,
                    tag: args.tag,
                    rating: args.rating,
                    description: args.description,
                    imageName: args.imageName,
                    category: args.category
                });
                return product.save();
            }
        },
        updateProduct: {
            type: ProductType,
            args: {
                ID:             { type: GraphQLID },
                name:           { type: GraphQLString },
                price:          { type: GraphQLString },
                category:       { type: GraphQLString },
                tag:            { type: GraphQLString },
                rating:         { type: GraphQLInt },
                description:    { type: GraphQLString },
                imageName:      { type: GraphQLString }
            },
            resolve(parent, args) {
                
                const product = Product.findById(args.ID);
                
                return Product.findByIdAndUpdate(args.ID, {
                    name: args.name ?? product.name,
                    price: args.price ?? product.price,
                    tag: args.tag ?? product.tag,
                    rating: args.rating ?? product.rating,
                    description: args.description ?? product.description,
                    imageName: args.imageName ?? product.imageName,
                    category: args.category ?? product.category,
                });

            }
        },
        removeProduct: {
            type: ProductType,
            args: {
                ID: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Product.findByIdAndRemove(args.ID);
            }
        }
    }
});

//#endregion

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
