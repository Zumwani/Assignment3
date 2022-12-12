const { GraphQLSchema, GraphQLObjectType , GraphQLID, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");
const Product = require("../../models/Product");
const Vendor = require("../../models/Vendor");

//#region Types

const VendorType = new GraphQLObjectType({
    name: "Vendor",
    fields: () => ({
        _id:    { type: GraphQLID },
        name:   { type: GraphQLString },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, _) {
                return Product.find({ vendorId: parent._id });
            }
        }
    })
});

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
        imageName:      { type: GraphQLString },
        vendor: {
            type: VendorType,
            resolve(parent, _) {
                return Vendor.findById(parent.vendorId);
            }
        }
    })
});

//#endregion
//#region Get

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: { 
        vendor: {
            type: VendorType,
            args: { id: { type: GraphQLID } },
            resolve(_, args) {
                return Vendor.findById(args.id);
            }
        },
        vendors: {
            type: new GraphQLList(VendorType),
            resolve(_, _1) {
                return Vendor.find({  });
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(_, args) {
                return Product.findById(args.id);
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(_, _1) {
                return Product.find({  });
            }
        }
    }
});

//#endregion
//#region Mutate

const Mutation = new GraphQLObjectType({
    name: "Mutation", 
    fields: {
        addVendor: {
            type: VendorType,
            args: {
                name: { type: GraphQLString }
            },
            resolve(_, args) {
                const vendor = new Vendor({
                    name: args.name
                });
                return vendor.save();
            }
        },
        addProduct: {
            type: ProductType,
            args: {
                name:           { type: GraphQLString },
                price:          { type: GraphQLString },
                category:          { type: GraphQLString },
                tag:            { type: GraphQLString },
                rating:         { type: GraphQLInt },
                description:    { type: GraphQLString },
                imageName:      { type: GraphQLString },
                vendorId:       { type: GraphQLID }
            },
            resolve(_, args) {
                const product = new Product({
                    name: args.name,
                    price: args.price,
                    tag: args.tag,
                    rating: args.rating,
                    description: args.description,
                    imageName: args.imageName,
                    category: args.category,
                    vendorId: args.vendorId
                });
                return product.save();
            }
        },
    }
});

//#endregion

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
