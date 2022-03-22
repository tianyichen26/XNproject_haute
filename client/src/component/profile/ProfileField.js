import React, { Fragment } from 'react';


export default class ProfileField extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            value: '',
        }
    }



    save = (updateFunc, _id, field, value) => {
        if (this.state.value !== '') {
            let snippet = {}
            snippet['id'] = _id
            snippet[field === 'Role' ? 'roleType' : field.toLowerCase()] = value
            updateFunc(snippet)
        }
        const { edit } = this.state
        this.setState({
            edit: !edit,
            value: '',
        })
    }

    edit = () => {
        const { edit } = this.state
        this.setState({
            edit: !edit
        })
    }

    change = (newValue, oldValue) => {
        this.setState({
            value: newValue ? newValue : oldValue
        })
    }

    renderInputField = (field, currentValue) => 
        field === 'Role' ?
        <select type='roleType' name='roleType' value={currentValue} 
            onChange={(event) => this.change(event.target.value, currentValue)}
            className='form-group' required>
            <option value="none" selected hidden> 
                Select an role type 
            </option> 
            <option value={'GENERAL_USER'}>General User</option>
            <option value={'ADMIN'}>Admin</option>
        </select> :
        <form className="form">
        <input 
            type="text"
            defaultValue={currentValue} 
            onChange={(event) => this.change(event.target.value, currentValue)} /> 
        </form> 
    

    render() {
        const { _id, field, currentValue, updateFunc, isAuthenticated } = this.props
        const { edit } = this.state
        return (
            !isAuthenticated && currentValue === undefined ? <div></div> :
            <div className="nugget">
                <h2 className="subtitle text-primary">{field}</h2>
                {isAuthenticated && this.state.edit ? 
                    this.renderInputField(field, currentValue) :
                    currentValue === 'GENERAL_USER' ? 'General User' : currentValue
                }
                <br />
                {isAuthenticated ? 
                    <button 
                        className="btn btn-light"
                        onClick={() => this.state.edit ? 
                        this.save(updateFunc, _id, field, this.state.value) : 
                        this.edit()}>
                            {edit ? 
                                "Save" :
                                currentValue ===  undefined ? "Add" : "Edit"}
                    </button> : 
                    <div></div>
                }
            </div>
        )
    }

}