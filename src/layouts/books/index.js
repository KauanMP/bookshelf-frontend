/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useMaterialUIController } from "context";
import Footer from "examples/Footer";
// eslint-disable-next-line no-unused-vars
import DataTable from "examples/Tables/DataTable";

// Data
// eslint-disable-next-line no-unused-vars
import booksTableData from "layouts/books/data/booksTableData";
import { useBooks } from "hooks/useBooks";
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import MDProgress from "components/MDProgress";

function Books() {
  // eslint-disable-next-line no-unused-vars
  const [columns, setColumns] = useState();
  // eslint-disable-next-line no-unused-vars
  const [rows, setRows] = useState();
  const [books, setBooks] = useState();
  const useBook = useBooks();
  const [controller] = useMaterialUIController();
  const { token } = controller;

  useEffect(() => {
    if (token) {
      useBook.getAllBooks(token.slice(10, -2)).then((resp) => {
        if (resp) {
          booksTableData(resp).then((data) => {
            setBooks(data);
          });
        }
      });
    }
  }, [token]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Lista de livros
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {books ? (
                  <DataTable
                    table={books}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                ) : (
                  <MDProgress />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Books;
