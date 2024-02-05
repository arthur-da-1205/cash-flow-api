-- CreateTable
CREATE TABLE "User" (
    "UserID" SERIAL NOT NULL,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "CategoryID" SERIAL NOT NULL,
    "CategoryName" TEXT NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("CategoryID")
);

-- CreateTable
CREATE TABLE "Product" (
    "ProductID" SERIAL NOT NULL,
    "ProductName" TEXT NOT NULL,
    "CategoryID" INTEGER NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("ProductID")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "TransactionID" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "ProductID" INTEGER,
    "CategoryID" INTEGER,
    "TransactionType" TEXT NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("TransactionID")
);

-- CreateTable
CREATE TABLE "Balance" (
    "BalanceID" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("BalanceID")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_CategoryID_fkey" FOREIGN KEY ("CategoryID") REFERENCES "ProductCategory"("CategoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Product"("ProductID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_CategoryID_fkey" FOREIGN KEY ("CategoryID") REFERENCES "ProductCategory"("CategoryID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;
