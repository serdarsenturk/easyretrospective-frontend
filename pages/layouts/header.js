import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faColumns, faPlus, faHome, faTachometer } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    return (
      <>
        <header className="masthead">
            <div className="boards-menu">

                <nav>
                  <a className="boards-btn btn" href="/"><FontAwesomeIcon icon={faHome} aria-hidden="true"/> Home</a>
                </nav>

                <nav>
                  <a className="boards-btn btn" href="/dashboard"><FontAwesomeIcon icon={faTachometer} aria-hidden="true"/> Dashboard</a>
                </nav>
            </div>

            <div className="logo">
                <i><FontAwesomeIcon icon={faColumns}/>EasyRetrospective</i>
            </div>
            
        </header>
      </>
    );
  }
  