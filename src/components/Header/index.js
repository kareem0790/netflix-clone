import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {GiHamburgerMenu} from 'react-icons/gi'
import {ImCross} from 'react-icons/im'
import {HiOutlineSearch} from 'react-icons/hi'

import './index.css'

class Header extends Component {
  state = {
    showMenu: false,
  }

  onShowSmallMenu = () => {
    this.setState({showMenu: true})
  }

  onClickHideMenu = () => {
    this.setState({showMenu: false})
  }

  onChangeInput = event => {
    const {onChangeSearchInput} = this.props
    onChangeSearchInput(event)
  }

  onClickSearch = () => {
    const {onClickSearchIcon} = this.props
    onClickSearchIcon()
  }

  render() {
    const {showMenu} = this.state
    const item = this.props
    const {search} = item

    return (
      <nav className="nav-container">
        <div className="container">
          <div className="logo-container">
            <Link to="/" className="nav-link">
              <img
                src="https://res.cloudinary.com/drgslpoho/image/upload/v1690393145/hewbfzdvblmx4dfgyjow.png"
                alt="website logo"
                className="logo-image"
              />
            </Link>
            <ul className="nav-home-list-container">
              <Link className="nav-link" to="/">
                <li className="home-heading">Home</li>
              </Link>
              <Link to="/popular" className="nav-link">
                <li className="home-heading">Popular</li>
              </Link>
            </ul>
          </div>
          <div className="search-container">
            {search === 'search' ? (
              <div className="input-search-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.onChangeInput}
                />
                <button
                  testid="searchButton"
                  type="button"
                  onClick={this.onClickSearch}
                  className="search-icon-button"
                >
                  <HiOutlineSearch size={25} color="#ffffff" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                testid="searchButton"
                className="search-button"
              >
                <Link className="nav-link" to="/search">
                  <AiOutlineSearch size={30} color="#ffffff" />
                </Link>
              </button>
            )}
            <button
              className="hamberg-button"
              type="button"
              onClick={this.onShowSmallMenu}
            >
              <GiHamburgerMenu size={30} color="#ffffff" />
            </button>
            <button type="button" className="avatar">
              <Link to="/account" className="nav-link">
                <img
                  src="https://res.cloudinary.com/drgslpoho/image/upload/v1690428675/pygpuvg6zwwaz350kfdg.jpg"
                  alt="profile"
                  className="avatar-image"
                />
              </Link>
            </button>
          </div>
        </div>
        {showMenu && (
          <div>
            <ul className="modal-list-container">
              <Link to="/" className="nav-link">
                <li className="small-home-heading">Home</li>
              </Link>
              <Link to="/popular" className="nav-link">
                <li className="small-home-heading">Popular</li>
              </Link>

              <Link to="/account" className="nav-link">
                <li className="small-home-heading">Account</li>
              </Link>
              <ImCross
                size={10}
                color="#ffffff"
                onClick={this.onClickHideMenu}
                className="icon"
              />
            </ul>
          </div>
        )}
      </nav>
    )
  }
}

export default Header
