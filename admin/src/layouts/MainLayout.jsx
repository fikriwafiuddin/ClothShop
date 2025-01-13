import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import PropTypes from "prop-types"

function MainLayout({ children, title }) {
  return (
    <div className="bg-violet-50">
      <div className="flex h-screen box-border">
        <Sidebar />

        <div className="flex-1 p-6 overflow-y-auto">
          <Header title={title} />

          <main className="mt-6">{children}</main>
        </div>
      </div>
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

export default MainLayout
