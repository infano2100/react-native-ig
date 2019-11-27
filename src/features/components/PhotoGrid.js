/**
 * Created by Sivaraj Nagaraj
 */
import React, { Component } from 'react'
import { 
    View, 
    Image, 
    Dimensions, 
} from 'react-native'
import _ from 'lodash'

class PhotoGrid extends Component {

    constructor(props) {
        super(props)
        this.state = {
            photoUrl: '',
        }
    }

    renderChunk() {
        let chunk = _.chunk(this.props.PhotosList, 9)

        return chunk.map(
            (chunkItem, index) => {
                let row = _.chunk(chunkItem, 3)

                return row.map(
                    (rowItem, rowIndex) => {

                        return this.renderPhotoRow(rowItem, rowIndex)
                    }
                )

            }
        )
    }

    renderPhotoRow(rowItem, rowIndex) {
        if (rowIndex == 0) {
            return this.renderPhotoRow1(rowItem)
        }
        else if (rowIndex == 1) {
            return this.renderPhotoRow2(rowItem)
        }
        else if (rowIndex == 2) {
            return this.renderPhotoRow3(rowItem)
        }
    }

    renderPhotoRow1(row) {
        return (
            <View key={1} style={styles.alignCenter}>
                {
                    row.map(
                        (item, index) => {
                            return (
                                <View key={index} style={[styles.photoView, { borderRadius: this.props.borderRadius }]}>
                                    <Image source={{ uri: item.url }} style={[styles.ImageStyle, { borderRadius: this.props.borderRadius }]} />
                                </View>
                            )
                        }

                    )
                }

            </View>
        )
    }

    renderPhotoRow2(row) {
        if (row.length == 1) {
            return (
                <View key={row[0].url} style={styles.alignCenter}>
                    <View key={row[0].url} style={[styles.expandedView, { borderRadius: this.props.borderRadius }]}>
                        <Image source={{ uri: row[0].url }} style={[styles.ImageStyle, styles.expandedImage, { borderRadius: this.props.borderRadius }]} />
                    </View>
                </View>
            )
        }
        else if (row.length == 2) {
            return (
                <View key={row[0].url} style={styles.alignCenter}>
                    <View key={row[0].url} style={[styles.expandedView, { borderRadius: this.props.borderRadius }]}>
                        <Image source={{ uri: row[0].url }} style={[styles.ImageStyle, styles.expandedImage, { borderRadius: this.props.borderRadius }]} />
                    </View>
                    <View key={row[1].url} style={styles.flexCol}>
                        <View style={[styles.photoView, { borderRadius: this.props.borderRadius }]}>
                            <Image source={{ uri: row[1].url }} style={[styles.ImageStyle, { borderRadius: this.props.borderRadius }]} />
                        </View>
                    </View>
                </View>
            )
        }
        else if (row.length == 3) {
            return (
                <View key={row[0].url} style={styles.alignCenter}>
                    <View key={row[0].url} style={[styles.expandedView, { borderRadius: this.props.borderRadius }]}>
                        <Image source={{ uri: row[0].url }} style={[styles.ImageStyle, styles.expandedImage, { borderRadius: this.props.borderRadius }]} />
                    </View>
                    <View key={row[1].url} style={styles.flexCol}>
                        <View style={[styles.photoView, { borderRadius: this.props.borderRadius }]}>
                            <Image source={{ uri: row[1].url }} style={[styles.ImageStyle, { borderRadius: this.props.borderRadius }]} />
                        </View>
                        <View style={[styles.photoView, { borderRadius: this.props.borderRadius }]}>
                            <Image source={{ uri: row[2].url }} style={[styles.ImageStyle, { borderRadius: this.props.borderRadius }]} />
                        </View>
                    </View>
                </View>
            )
        }
    }

    renderPhotoRow3(row) {
        if (row.length == 1) {
            return (
                <View key={row[0].url} style={styles.alignCenter}>
                    <View key={row[0].url} style={styles.flexCol}>
                        <View style={[styles.photoView, { borderRadius: this.props.borderRadius }]}>
                            <Image source={{ uri: row[0].url }} style={[styles.ImageStyle, { borderRadius: this.props.borderRadius }]} />
                        </View>

                    </View>
                </View>
            )
        }
        else if (row.length == 2) {
            return (
                <View key={row[0].url} style={styles.alignCenter}>
                    <View key={row[0].url} style={styles.flexCol}>
                        <View style={[styles.photoView, { borderRadius: this.props.borderRadius }]}>
                            <Image source={{ uri: row[0].url }} style={[styles.ImageStyle, { borderRadius: this.props.borderRadius }]} />
                        </View>
                        <View key={row[1].url} style={[styles.photoView, { borderRadius: this.props.borderRadius }]}>
                            <Image source={{ uri: row[1].url }} style={[styles.ImageStyle, { borderRadius: this.props.borderRadius }]} />
                        </View>
                    </View>
                </View>
            )
        }
        else if (row.length == 3) {
            return (
                <View key={row[0].url} style={styles.alignCenter}>

                    <View style={styles.flexCol}>
                        <View style={[styles.photoView, { borderRadius: this.props.borderRadius }]}>
                            <Image source={{ uri: row[0].url }} style={[styles.ImageStyle, { borderRadius: this.props.borderRadius }]} />
                        </View>
                        <View style={[styles.photoView, { borderRadius: this.props.borderRadius }]}>
                            <Image source={{ uri: row[1].url }} style={[styles.ImageStyle, { borderRadius: this.props.borderRadius }]} />
                        </View>
                    </View>
                    <View style={[styles.expandedView, { borderRadius: this.props.borderRadius }]}>
                        <Image source={{ uri: row[2].url }} style={[styles.ImageStyle, styles.expandedImage, { borderRadius: this.props.borderRadius }]} />
                    </View>
                </View>
            )
        }
    }

    renderGrid() {
        return (
            <View>
                {this.renderChunk()}
            </View>
        )
    }

    render() {
        return (
            <View style={[styles.container]}>
                {this.renderGrid()}
            </View>
        )
    }

}

/*Styles*/

const styles = {

    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ImageStyle: {
        width: View.width,
        height: 120,
        resizeMode: 'cover'
    },
    flexCol: {
        flexDirection: 'column',
        flex: 1
    },
    alignCenter: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width - 20,
        paddingRight: 5
    },
    photoView: {
        height: 120,
        flex: 2,
        backgroundColor: 'gray',
        marginHorizontal: 1,
        marginVertical: 1,
        justifyContent: 'center'
    },
    expandedView: {
        height: 249,
        backgroundColor: 'gray',
        marginHorizontal: 1,
        marginVertical: 1,
        flex: 2
    },
    expandedImage: {
        height: 249,
    },
}

export { PhotoGrid }