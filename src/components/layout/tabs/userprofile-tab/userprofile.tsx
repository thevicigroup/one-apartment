import React from "react";
import '@/components/layout/tabs/userprofile-tab/userprofile.css'

export const UserProfile = () => {
    return (
        <div className="container bootstrap snippets bootdeys">
            <div className="row">
                <div className="col-xs-12 col-sm-9">
                    <form className="form-horizontal">
                        <div className="panel panel-default">
                            <div className="panel-body text-center">
                                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" className="img-circle profile-avatar" alt="User avatar" />
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title">User info</h4>
                            </div>
                            <div className="panel-body">
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Location</label>
                                    <div className="col-sm-10">
                                        <select className="form-control">
                                            <option value="">Select country</option>
                                            <option>Belgium</option>
                                            <option>Canada</option>
                                            <option>Denmark</option>
                                            <option>Estonia</option>
                                            <option>France</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Company name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Position</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title">Contact info</h4>
                            </div>
                            <div className="panel-body">
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Work number</label>
                                    <div className="col-sm-10">
                                        <input type="tel" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Mobile number</label>
                                    <div className="col-sm-10">
                                        <input type="tel" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">E-mail address</label>
                                    <div className="col-sm-10">
                                        <input type="email" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Work address</label>
                                    <div className="col-sm-10">
                                        <textarea className="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title">Security</h4>
                            </div>
                            <div className="panel-body">
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Current password</label>
                                    <div className="col-sm-10">
                                        <input type="password" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">New password</label>
                                    <div className="col-sm-10">
                                        <input type="password" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-10 col-sm-offset-2">
                                        <div className="checkbox">
                                            <input type="checkbox" id="checkbox_1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-10 col-sm-offset-2">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                        <button type="reset" className="btn btn-default">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            </div>
    );
}
